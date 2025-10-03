import { Link } from 'react-router-dom';
import '../styles/breadcrumb.css';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      {crumbs.map((crumb, index) => (
        <span key={index} className="breadcrumb-item">
          {crumb.path && index < crumbs.length - 1 ? (
            <Link to={crumb.path} className="breadcrumb-link">
              {crumb.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{crumb.label}</span>
          )}
          {index < crumbs.length - 1 && <span className="breadcrumb-separator">{'>'}</span>}
        </span>
      ))}
    </nav>
  );
}