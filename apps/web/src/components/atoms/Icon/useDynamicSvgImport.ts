import type { FC, SVGProps } from 'react';
import { useEffect, useRef, useState } from 'react';

interface IDynamic {
  error: unknown;
  loading: boolean;
  SvgIcon: FC<SVGProps<SVGElement>> | undefined;
}
type TDynamicFunc = (iconName: string) => IDynamic;

export const useDynamicSvgImport: TDynamicFunc = (iconName: string) => {
  const importedIconRef = useRef<FC<SVGProps<SVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(true);
    const importSvgIcon = async (): Promise<void> => {
      try {
        importedIconRef.current = (
          await import(`../../../assets/icons/${iconName}.svg`)
        ).ReactComponent;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    importSvgIcon();
  }, [iconName]);

  return { error, loading, SvgIcon: importedIconRef.current };
};
