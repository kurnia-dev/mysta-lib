import { KanbanBoard, KanbanColumn } from 'lib/components';

const KanbanDocs: React.FC = () => {
  return (
    <KanbanBoard className="flex gap-2" onUpdate={(e) => console.log(e)}>
      <KanbanColumn
        data={[
          {
            id: 'qwer',
            menus: [
              {
                icon: 'edit',
                className: '!text-danger-500',
                command(e) {
                  console.log(e);
                },
              },
              {
                icon: 'trash',
                command(e) {
                  console.log(e);
                },
              },
            ],
            severity: 'secondary',
            header: 'triggerOnMouseOver',
            content:
              'Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod.',
          },
          {
            menus: [
              {
                icon: 'edit',
                className: '!text-danger-500',
                command(e) {
                  console.log(e);
                },
              },
              {
                icon: 'trash',
                command(e) {
                  console.log(e);
                },
              },
            ],
            severity: 'primary',
            header: 'triggerOnMouseOver',
            content:
              'Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod.',
          },
          {
            menus: [
              { icon: 'edit', className: '!text-danger-500' },
              { icon: 'trash' },
            ],
            severity: 'success',
            header: 'triggerOnMouseOver',
            content:
              'Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod.',
          },
        ]}
        groupId="to-do"
        onDrop={(e) => console.log(e)}
      />
      <KanbanColumn
        data={[
          {
            menus: [
              { icon: 'edit', className: '!text-danger-500' },
              { icon: 'trash' },
            ],
            severity: 'danger',
            header: 'triggerOnMouseOver',
            content:
              'Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod.',
          },
          {
            menus: [
              { icon: 'edit', className: '!text-danger-500' },
              { icon: 'trash' },
            ],
            severity: 'warning',
            header: 'triggerOnMouseOver',
            content:
              'Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod.',
          },
          {
            menus: [
              { icon: 'edit', className: '!text-danger-500' },
              { icon: 'trash' },
            ],
            severity: 'info',
            header: 'triggerOnMouseOver',
            content:
              'Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod.',
          },
        ]}
        groupId="done"
        onDrop={(e) => console.log(e)}
      />
    </KanbanBoard>
  );
};

export default KanbanDocs;
