import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import {
  useFloating,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { MdClose } from "react-icons/md";

interface dataProps<T = object> {
  name: string;
  title: string;
  data: T[] | undefined;
  placeholder: string;
  renderData: (item: T) => string | React.ReactNode;
  filterFn: (item: T, query: string) => T | React.ReactNode;
}

const GithubFilter = <T extends object>({
  name,
  title,
  placeholder,
  data,
  renderData,
  filterFn,
}: dataProps<T>) => {
  // 1. Define TypeScript types for props
  // 2. Accept a render prop or accessor function to tell the component what field to filter/display
  // 3. Handle loading states (data might be undefined initially)
  // 4. Make it reusable across different data shapes
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end",
    middleware: [offset({ mainAxis: 5, crossAxis: 10 }), flip(), shift()],
  });

  const filteredData = data?.filter((item) => filterFn(item, searchTerm));

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <div>
      <div>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          {name}
          <span>
            <FaAngleDown />
          </span>
        </button>
        {isOpen && (
          <div
            className="bg-white border border-gray-200 shadow-md text-xs w-64 flex flex-col rounded-lg"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div className="m-2 pl-1 font-semibold flex items-center">
              <p>{title}</p>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto px-1 "
              >
                <MdClose className="w-4 h-4" />
              </button>
            </div>
            <hr />
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="m-2 p-2 border border-gray-300 rounded-lg"
            />
            <hr />
            <div className="overflow-auto h-64 flex flex-col">
              <ul>
                {filteredData?.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-gray-200 font-semibold p-2 pl-6 hover:bg-gray-100"
                  >
                    {renderData(item)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubFilter;
