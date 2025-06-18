import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/button';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Button asChild>
        <h3>Welcome Home!</h3>
      </Button>
    </div>
  );
}
