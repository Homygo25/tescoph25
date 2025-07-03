import CVSLogoImage from '../images/CVS-logo-transparent.png';

function CVSLogo() {
    return (
        <div className="flex items-center justify-center">
            <img 
                src={CVSLogoImage} 
                alt="CVS Pharmacy Logo" 
                className="h-8 w-auto md:h-10"
            />
        </div>
    );
}

export default CVSLogo;
