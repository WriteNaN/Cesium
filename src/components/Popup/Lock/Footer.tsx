export default function Footer () {
    return (
        <div className="lockscreen-footer">
            <div className="w-full" tabIndex={0}>
                <button formTarget="unlock" style={{ fontWeight: 600 }} className="unlock-button">Unlock</button>
            </div>
        </div>
    );
}