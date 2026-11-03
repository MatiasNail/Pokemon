export default function StatusMessage({ mensaje, esError = false }) {
  return <p className={`status${esError ? " error" : ""}`}>{mensaje}</p>;
}