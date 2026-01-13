import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Organization {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  currentOrg: Organization | null;
  organizations: Organization[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  switchOrg: (orgId: string) => void;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            loadUserOrganizations(session.user.id);
          }, 0);
        } else {
          setOrganizations([]);
          setCurrentOrg(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserOrganizations(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserOrganizations = async (userId: string) => {
    try {
      const { data: memberships, error } = await (supabase as any)
        .from('organization_members')
        .select('organization_id, organizations(id, name)')
        .eq('user_id', userId);

      if (error) {
        console.warn('Organizations table not ready:', error);
        setLoading(false);
        return;
      }

      const orgs = memberships?.map((m: any) => ({
        id: m.organizations.id,
        name: m.organizations.name
      })) || [];

      setOrganizations(orgs);
      
      // Set first org as current if none selected
      const storedOrgId = localStorage.getItem('currentOrgId');
      const orgToSet = orgs.find(o => o.id === storedOrgId) || orgs[0];
      if (orgToSet) {
        setCurrentOrg(orgToSet);
        localStorage.setItem('currentOrgId', orgToSet.id);
      }
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultOrganization = async (userId: string, email: string) => {
    try {
      const { data: org, error: orgError } = await (supabase as any)
        .from('organizations')
        .insert({ name: `${email.split('@')[0]}'s Organization` })
        .select()
        .single();

      if (orgError) {
        console.warn('Organization table not ready:', orgError);
      } else if (org) {
        const { error: memberError } = await (supabase as any)
          .from('organization_members')
          .insert({ organization_id: org.id, user_id: userId, role: 'admin' });
        
        if (memberError) {
          console.warn('Membership table not ready:', memberError);
        }
      }
    } catch (err) {
      console.warn('Multi-tenant tables not ready yet:', err);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    toast.success('Signed in successfully');
    navigate('/');
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    
    if (error) throw error;
    
    // Check if we got a session (confirmations OFF) or not (confirmations ON)
    if (data.session && data.user) {
      // User is immediately logged in - confirmations are OFF
      await createDefaultOrganization(data.user.id, email);
      toast.success('Account created! Welcome to StratNova Hub.');
      navigate('/');
    } else if (data.user && !data.session) {
      // Email confirmation is required
      toast.info('Please check your email to confirm your account.');
    } else {
      // Edge case: user might already exist (Supabase returns success to prevent enumeration)
      toast.info('If you already have an account, please sign in instead.');
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem('currentOrgId');
    setCurrentOrg(null);
    setOrganizations([]);
    toast.success('Signed out successfully');
    navigate('/auth');
  };

  const switchOrg = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
      localStorage.setItem('currentOrgId', orgId);
      toast.success(`Switched to ${org.name}`);
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset`
    });
    if (error) throw error;
    toast.success('Check your email for the password reset link.');
  };

  const resendVerification = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email
    });
    if (error) throw error;
    toast.success('Verification email resent. Please check your inbox.');
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      currentOrg,
      organizations,
      loading,
      signIn,
      signUp,
      signOut,
      switchOrg,
      resetPassword,
      resendVerification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
