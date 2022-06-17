import RootAlertHelper from "./RootAlertHelper";
import useOTAUpdateStatus from "./useOTAUpdateStatus";

interface RootOTAUpdatesProps {
  content: any;
}

const RootOTAUpdates = ({ content }: RootOTAUpdatesProps) => {
  const [showReloadDialog] = useOTAUpdateStatus();
  return <RootAlertHelper content={content} show={showReloadDialog} />;
};

export default RootOTAUpdates;
