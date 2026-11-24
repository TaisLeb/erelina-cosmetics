import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__intro">
          <div>
            <p className="footer__eyebrow">A little ritual, every day</p>
            <h2 className="footer__heading">Good things grow <em>naturally.</em></h2>
          </div>
          <Link href="/product/orange-sunset" className="footer__cta" data-cursor="hover">
            Explore the ritual <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="footer__details">
          <p className="footer__description">Biodynamic skincare, grown &amp; pressed in Tahoe, California.</p>
          <nav className="footer__nav" aria-label="Footer navigation">
            <span className="footer__label">Explore</span>
            <Link href="/product/orange-sunset" data-cursor="hover">Shop</Link>
            <a href="/#ingredients" data-cursor="hover">Ingredients</a>
            <a href="/#story" data-cursor="hover">Our story</a>
          </nav>
          <div className="footer__contact">
            <span className="footer__label">Say hello</span>
            <a href="mailto:hello@erelina.com" data-cursor="hover">hello@erelina.com <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="footer__wordmark"><Logo /></div>
        <div className="footer__bar">
          <span>© 2026 Erelina Cosmetics</span>
          <span>Made with care · Tahoe, California</span>
          <a href="#top" data-cursor="hover">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
