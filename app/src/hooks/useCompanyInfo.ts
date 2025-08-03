import { useState, useEffect } from 'react';

interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  timezone: string;
  currency: string;
  address: string;
  social_links: Record<string, string>;
}

interface UseCompanyInfoResult {
  companyInfo: CompanyInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const defaultCompanyInfo: CompanyInfo = {
  name: 'AKIBEKS CONSTRUCTION LIMITED',
  phone: '+254-700-000000',
  email: 'info@akibeks.co.ke',
  website: 'https://akibeks.co.ke',
  logo_url: '/assets/logo.png',
  timezone: 'Africa/Nairobi',
  currency: 'KES',
  address: 'P.O. Box 12345-00100\nNairobi, Kenya',
  social_links: {}
};

export const useCompanyInfo = (): UseCompanyInfoResult => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/company/public');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setCompanyInfo(data);
    } catch (err) {
      console.warn('Failed to fetch company info, using defaults:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch company info');
      // Use default company info as fallback
      setCompanyInfo(defaultCompanyInfo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return {
    companyInfo,
    loading,
    error,
    refetch: fetchCompanyInfo
  };
};

export default useCompanyInfo;