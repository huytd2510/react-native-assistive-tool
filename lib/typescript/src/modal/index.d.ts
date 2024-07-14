import React from 'react';
import type { DebugAddOnView } from '../assistive/assistive-cmp';
interface AssistiveModalProps {
    visible: boolean;
    close: () => void;
    customNetworkComponent?: React.ReactNode;
    navigationRef?: React.Ref<any>;
    debugAddOnView?: DebugAddOnView[];
}
export declare const AssistiveTouchModal: React.FC<AssistiveModalProps>;
export default AssistiveTouchModal;
//# sourceMappingURL=index.d.ts.map