import "./Buttonme.css";

const Buttonme = ({ content, onClick }) => {
  return (
    <button
      className="button button--me button--text-thick button--text-upper button--size-s"
      data-text={content}
      onClick={onClick}
    >
      {content && content.split("").map((char, index) => <span key={index}>{char}</span>)}
    </button>
  );
};

export default Buttonme;
