export type Props = {
  eventId: string;
  setClose: () => void;
  reSync: () => void;
  isCancel: boolean;
};

export type useProps = {
  cancelEvent: Function;
  loading: boolean;
};
