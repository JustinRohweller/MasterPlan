interface RootAlertHelperProps {
  content: any;
  show: boolean;
}

const RootAlertHelper = ({ show, content }: RootAlertHelperProps) => {
  const Content = content;
  if (show) {
    return <Content />;
  }
  return null;
};

export default RootAlertHelper;
