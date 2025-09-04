import React from 'react';
import {
  FileText,
  MessageSquare,
  Bot,
  Upload,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Send,
  Loader2,
  FileIcon,
  Activity,
  Zap,
  HardDrive,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  FolderOpen,
  BarChart3
} from 'lucide-react';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export type IconName = 
  | 'document'
  | 'chat'
  | 'bot'
  | 'upload'
  | 'settings'
  | 'logout'
  | 'plus'
  | 'delete'
  | 'send'
  | 'loading'
  | 'file'
  | 'activity'
  | 'lightning'
  | 'storage'
  | 'users'
  | 'trending'
  | 'success'
  | 'processing'
  | 'error'
  | 'folder'
  | 'analytics'
  | 'google'
  | 'github'
  | 'facebook'
  | 'twitter'
  | 'linkedin';

const iconMap = {
  // Lucide icons
  document: FileText,
  chat: MessageSquare,
  bot: Bot,
  upload: Upload,
  settings: Settings,
  logout: LogOut,
  plus: Plus,
  delete: Trash2,
  send: Send,
  loading: Loader2,
  file: FileIcon,
  activity: Activity,
  lightning: Zap,
  storage: HardDrive,
  users: Users,
  trending: TrendingUp,
  success: CheckCircle,
  processing: Clock,
  error: AlertCircle,
  folder: FolderOpen,
  analytics: BarChart3,
  // Brand icons from react-icons
  google: FaGoogle,
  github: FaGithub,
  facebook: FaFacebook,
  twitter: FaTwitter,
  linkedin: FaLinkedin
} as const;

/**
 * Centralized icon component using Lucide React and React Icons
 * 
 * @param props - Icon component properties
 * @returns JSX.Element - Icon with consistent styling
 */
export function Icon({ name, size = 'md', className }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return <FileIcon className={className} />;
  }

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  return (
    <IconComponent 
      className={cn(sizeClasses[size], className)} 
    />
  );
}