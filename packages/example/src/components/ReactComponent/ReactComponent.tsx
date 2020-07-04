import Button from 'components/Button';

export default function ReactComponent() {
  function onClick() {
    alert('This was triggered by React from a hydrated client.');
  }

  return (
    <div>
      <Button onClick={onClick}>Click me</Button>
    </div>
  );
}
