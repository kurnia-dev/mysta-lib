import { Card } from 'lib/components';
import { Severities } from 'lib/utils';

const CardDocs: React.FC = () => {
  const SEVERITY = [
    'secondary',
    'success',
    'primary',
    'danger',
    'warning',
    'info',
  ] as Severities[];

  return (
    <div className="grid gap-3 grid-cols-3 m-3">
      {SEVERITY.map((each) => {
        return (
          <Card
            key={each}
            severity={each}
            header="triggerOnMouseOver"
            content="Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod."
          />
        );
      })}
    </div>
  );
};

export default CardDocs;
