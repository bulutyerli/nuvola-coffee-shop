'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import styles from './ordersFilter.module.scss';

export default function OrdersFilter({ filter }: { filter: string }) {
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filter ? filter : 'Last 3 Months'
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const menuRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
    router.push(`/orders?filter=${filter}`);
  };

  const handleClickOut = (event: MouseEvent) => {
    const target = event.target;
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(target as Node) &&
      target !== menuRef.current
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOut);

    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.filter}>Select Filter</h3>
      <div className={styles.selected} onClick={toggleDropdown}>
        <div>{selectedFilter}</div>
        <IoMdArrowDropdown className={styles.icon} />

        {isDropdownOpen && (
          <div ref={menuRef} className={styles.dropdown}>
            <div
              className={styles.dropdownItem}
              onClick={() => handleFilterChange('Last 3 Months')}
            >
              Last 3 Months
            </div>
            {years.map((year) => (
              <div
                key={year}
                className={styles.dropdownItem}
                onClick={() => handleFilterChange(year.toString())}
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
