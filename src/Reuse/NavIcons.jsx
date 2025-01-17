import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavIcons({ icon, classname }) {
  return (
    <div>
      <FontAwesomeIcon icon={icon} className={classname} />
    </div>
  );
}
