import React from 'react';

// 🎨 React Native StyleSheet simulation for React Web
export const StyleSheet = {
  create<T extends Record<string, React.CSSProperties>>(styles: T): T {
    return styles;
  }
};

// 📱 Simulated React Native Layout Components for high-fidelity Web execution
interface SimulatedProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
}

export const View: React.FC<SimulatedProps> = ({ children, style, className, ...props }) => (
  <div style={style} className={className} {...props}>
    {children}
  </div>
);

export const SafeAreaView: React.FC<SimulatedProps> = ({ children, style, className, ...props }) => (
  <div 
    style={{ 
      paddingTop: 'env(safe-area-inset-top, 16px)', 
      paddingBottom: 'env(safe-area-inset-bottom, 16px)', 
      ...style 
    }} 
    className={className} 
    {...props}
  >
    {children}
  </div>
);

interface ScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
  contentContainerStyle?: React.CSSProperties;
}

export const ScrollView: React.FC<ScrollViewProps> = ({ children, style, contentContainerStyle, className, ...props }) => (
  <div 
    style={{ overflowY: 'auto', ...style }} 
    className={`scrollbar-none ${className || ''}`} 
    {...props}
  >
    <div style={contentContainerStyle}>
      {children}
    </div>
  </div>
);

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
}

export const TextInput: React.FC<TextInputProps> = ({ style, className, ...props }) => (
  <input style={style} className={className} {...props} />
);
