import { HTMLAttributes } from 'react';
import CVSLogoImage from '../images/CVS-logo-transparent.png';

export default function AppLogoIcon(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            {...props}
            src={CVSLogoImage} 
            alt="CVS Pharmacy Logo" 
            className={`h-8 w-auto ${props.className || ''}`}
        />
    );
}
