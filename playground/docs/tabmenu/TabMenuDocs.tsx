import { TabMenu } from '@mystaline/mysta-commons/components';
import { TabMenuItem } from '@mystaline/mysta-commons/components/tabmenu/TabMenu.d';
import { useModelValue } from '@mystaline/mysta-commons/hooks';

const KanbanDocs: React.FC = () => {
  const activeIndex1 = useModelValue<number>(0);
  const activeIndex2 = useModelValue<number>(0);
  const activeIndex3 = useModelValue<number>(0);
  const activeIndex4 = useModelValue<number>(0);
  const activeIndex5 = useModelValue<number>(0);

  const menus: TabMenuItem[] = [
    {
      label: 'Home',
      route: '/button',
    },
    {
      label: 'Contact',
      route: '/tabmenu',
    },
    {
      label: 'About',
      route: '/form',
    },
  ];

  const menusIcon: TabMenuItem[] = [
    {
      label: 'Home',
      route: '/button',
      icon: 'menu',
    },
    {
      label: 'Contact',
      route: '/tabmenu',
      icon: 'users-round',
    },
    {
      label: 'About',
      route: '/form',
      icon: 'info',
    },
  ];

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-3">
        No Icon
        <div className="flex flex-col gap-1">
          <span>Pill index {JSON.stringify(activeIndex1.get())}</span>
          <TabMenu activeIndex={activeIndex1} menus={menus} type="pill" />
        </div>
        <div className="flex flex-col gap-1">
          <span>Bold Underline index {JSON.stringify(activeIndex2.get())}</span>
          <TabMenu
            activeIndex={activeIndex2}
            menus={menus}
            type="bold-underline"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Thin Underline index {JSON.stringify(activeIndex3.get())}</span>
          <TabMenu
            activeIndex={activeIndex3}
            menus={menus}
            type="thin-underline"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Box index {JSON.stringify(activeIndex4.get())}</span>
          <TabMenu activeIndex={activeIndex4} menus={menus} type="box" />
        </div>
        <div className="flex flex-col gap-1">
          <span>Segmented index {JSON.stringify(activeIndex5.get())}</span>
          <TabMenu activeIndex={activeIndex5} menus={menus} type="segmented" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        With Icon
        <div className="flex flex-col gap-1">
          <span>Pill index {JSON.stringify(activeIndex1.get())}</span>
          <TabMenu activeIndex={activeIndex1} menus={menusIcon} type="pill" />
        </div>
        <div className="flex flex-col gap-1">
          <span>Bold Underline index {JSON.stringify(activeIndex2.get())}</span>
          <TabMenu
            activeIndex={activeIndex2}
            menus={menusIcon}
            type="bold-underline"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Thin Underline index {JSON.stringify(activeIndex3.get())}</span>
          <TabMenu
            activeIndex={activeIndex3}
            menus={menusIcon}
            type="thin-underline"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Box index {JSON.stringify(activeIndex4.get())}</span>
          <TabMenu activeIndex={activeIndex4} menus={menusIcon} type="box" />
        </div>
        <div className="flex flex-col gap-1">
          <span>Segmented index {JSON.stringify(activeIndex5.get())}</span>
          <TabMenu
            activeIndex={activeIndex5}
            menus={menusIcon}
            type="segmented"
          />
        </div>
      </div>
    </div>
  );
};

export default KanbanDocs;
