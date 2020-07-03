export default function ReactComponent() {
  function onClick() {
    alert('This was triggered by React from a hydrated client.');
  }

  return (
    <div>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
