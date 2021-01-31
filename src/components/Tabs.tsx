import React, {
  createContext,
  ReactChild,
  useCallback,
  useContext,
} from 'react';
import styled from 'styled-components';

interface TabsContextProps {
  onSelect?: (tabId: string) => void;
  selectedTab?: string;
}

const TabsContext = createContext<TabsContextProps | null>(null);

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
`;

interface TabsBaseProps {
  className?: string;
}

export type TabsProps = TabsBaseProps & TabsContextProps;

const Tabs: React.FC<TabsProps> = ({
  className,
  onSelect,
  selectedTab,
  children,
}) => {
  const providerValues = { onSelect, selectedTab };

  return (
    <TabsWrapper className={className}>
      <TabsContext.Provider value={providerValues}>
        {children}
      </TabsContext.Provider>
    </TabsWrapper>
  );
};
const TabWrapper = styled.div<{ active: boolean }>`
  margin: 0 8px 4px 0;
  padding: 4px 8px;

  font-size: 16px;
  line-height: 20px;

  color: #323232;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? '1px solid #323232' : 'none')};
`;

export interface TabProps {
  onSelect?: (tabId: string) => void;
  active?: boolean;
  tabId: string;
  className?: string;
  children: string | ReactChild;
}

const Tab: React.FC<TabProps> = ({
  children,
  className,
  active,
  tabId,
  onSelect,
}) => {
  const context = useContext(TabsContext);
  const isActive =
    active || (context && context.selectedTab === tabId) || false;
  const onTabSelect = onSelect || (context && context.onSelect);

  const handleTabSelect = useCallback(() => onTabSelect && onTabSelect(tabId), [
    tabId,
    onTabSelect,
  ]);

  return (
    <TabWrapper
      className={className}
      onClick={handleTabSelect}
      active={isActive}
    >
      {children}
    </TabWrapper>
  );
};

export { Tabs, Tab };
