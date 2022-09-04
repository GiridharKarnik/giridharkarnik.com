import React from 'react';
import { IconProps } from '../../../../types';

export const ErrorIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512">
      <path
        style={{ fill: color }}
        d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 0"
      />
    </svg>
  );
};
