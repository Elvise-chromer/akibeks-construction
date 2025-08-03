import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-hot-toast';

interface AutoSaveOptions {
  delay?: number;
  enabled?: boolean;
  onSave?: (data: any) => Promise<boolean>;
  onError?: (error: Error) => void;
  showNotifications?: boolean;
  saveKey?: string;
}

interface AutoSaveState {
  isSaving: boolean;
  lastSaved: string | null;
  hasUnsavedChanges: boolean;
  error: string | null;
}

export const useAutoSave = <T>(
  data: T,
  options: AutoSaveOptions = {}
) => {
  const {
    delay = 2000,
    enabled = true,
    onSave,
    onError,
    showNotifications = true,
    saveKey = 'autosave'
  } = options;

  const [state, setState] = useState<AutoSaveState>({
    isSaving: false,
    lastSaved: null,
    hasUnsavedChanges: false,
    error: null
  });

  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastDataRef = useRef<T>(data);
  const saveAttemptsRef = useRef(0);

  // Debounced save function
  const debouncedSave = useCallback(async () => {
    if (!enabled || !onSave) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      try {
        setState(prev => ({ ...prev, isSaving: true, error: null }));

        const success = await onSave(data);
        
        if (success) {
          setState(prev => ({
            ...prev,
            isSaving: false,
            lastSaved: new Date().toLocaleTimeString(),
            hasUnsavedChanges: false,
            error: null
          }));

          // Reset save attempts on successful save
          saveAttemptsRef.current = 0;

          if (showNotifications) {
            toast.success('Auto-saved successfully');
          }
        } else {
          throw new Error('Save operation failed');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Auto-save failed';
        
        setState(prev => ({
          ...prev,
          isSaving: false,
          error: errorMessage
        }));

        saveAttemptsRef.current += 1;

        // Show error notification after multiple failed attempts
        if (saveAttemptsRef.current >= 3 && showNotifications) {
          toast.error(`Auto-save failed: ${errorMessage}`);
        }

        if (onError && error instanceof Error) {
          onError(error);
        }
      }
    }, delay);
  }, [data, enabled, onSave, onError, delay, showNotifications]);

  // Trigger auto-save when data changes
  useEffect(() => {
    // Skip if data hasn't actually changed
    if (JSON.stringify(data) === JSON.stringify(lastDataRef.current)) {
      return;
    }

    lastDataRef.current = data;
    setState(prev => ({ ...prev, hasUnsavedChanges: true }));

    if (enabled) {
      debouncedSave();
    }
  }, [data, enabled, debouncedSave]);

  // Manual save function
  const saveNow = useCallback(async () => {
    if (!onSave) return;

    try {
      setState(prev => ({ ...prev, isSaving: true, error: null }));

      const success = await onSave(data);
      
      if (success) {
        setState(prev => ({
          ...prev,
          isSaving: false,
          lastSaved: new Date().toLocaleTimeString(),
          hasUnsavedChanges: false,
          error: null
        }));

        saveAttemptsRef.current = 0;

        if (showNotifications) {
          toast.success('Saved successfully');
        }

        return true;
      } else {
        throw new Error('Save operation failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Save failed';
      
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: errorMessage
      }));

      if (showNotifications) {
        toast.error(`Save failed: ${errorMessage}`);
      }

      if (onError && error instanceof Error) {
        onError(error);
      }

      return false;
    }
  }, [data, onSave, onError, showNotifications]);

  // Save to localStorage as backup
  const saveToLocalStorage = useCallback(() => {
    try {
      const backupData = {
        data,
        timestamp: new Date().toISOString(),
        key: saveKey
      };
      localStorage.setItem(`autosave_${saveKey}`, JSON.stringify(backupData));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [data, saveKey]);

  // Load from localStorage backup
  const loadFromLocalStorage = useCallback(() => {
    try {
      const backup = localStorage.getItem(`autosave_${saveKey}`);
      if (backup) {
        const backupData = JSON.parse(backup);
        const backupAge = Date.now() - new Date(backupData.timestamp).getTime();
        
        // Only load if backup is less than 24 hours old
        if (backupAge < 24 * 60 * 60 * 1000) {
          return backupData.data;
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return null;
  }, [saveKey]);

  // Clear backup
  const clearBackup = useCallback(() => {
    try {
      localStorage.removeItem(`autosave_${saveKey}`);
    } catch (error) {
      console.error('Failed to clear localStorage backup:', error);
    }
  }, [saveKey]);

  // Save backup periodically
  useEffect(() => {
    if (enabled) {
      const interval = setInterval(saveToLocalStorage, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [enabled, saveToLocalStorage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    saveNow,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearBackup,
    retrySave: debouncedSave
  };
};