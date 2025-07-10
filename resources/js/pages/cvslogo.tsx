
// Use public path for logo to ensure visibility
const logoCvs = '/logoCvs.png';

export default function CVSLogo() {
    return (
        <img
            src={logoCvs}
            alt="CVS Pharmacy"
            style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto', maxWidth: 320 }}
        />
    );
}
