import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Header({ controlMusic, music }) {
  return (
    <header className="header">
      <div>
        <img src="/pokeball2.png" alt="pokeball" className="header-img"></img>
      </div>
      <div className="header-links">
        <button
          onClick={controlMusic}
          style={{ background: "none", border: "none", padding: 0 }}
          value={music}
        >
          {music ? (
            <FontAwesomeIcon className="header-music" icon={faVolumeHigh} />
          ) : (
            <FontAwesomeIcon className="header-music" icon={faVolumeMute} />
          )}
        </button>
        <a
          target="_blank"
          rel="noreferrer"
          href="  https://github.com/BScafura"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/brenoscafura/"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="mailto:enzoscafura@gmail.com?subject=Parab%C3%A9ns!&body=Parab%C3%A9ns%20Breno!%0AAdoramos%20sua%20poked%C3%A9x%20e%20agora%20voc%C3%AA%20%C3%A9%20um%20alquimista%20Subvisual!"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </header>
  );
}
