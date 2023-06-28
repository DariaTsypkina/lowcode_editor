import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { NodeContextMenu } from "../NodeContextMenu/NodeContextMenu";
import { StyledCustomInput, StyledOptionsList, StyledSubtitle, StyledTitle } from "./CustomInput.styles";
import { mdiCommentQuote } from "@mdi/js";
import Icon from "@mdi/react";
import { type NodeProps, Position, useReactFlow, useStoreApi } from "reactflow";
import { DeafultHandle } from "src/components/Handles/DeafultHandle/DeafultHandle";
import { ExitHandle } from "src/components/Handles/ExitHandle/ExitHandle";
import { type ExitVariant } from "src/components/Handles/ExitHandle/ExitHandle.types";
import { useDeleteNode } from "src/hooks/useDeleteNode";

interface Option {
  id: string;
  value: string;
  variant: ExitVariant;
}

const variants: ExitVariant[] = ["success", "warning", "error"];

const sortByObject = variants.reduce((obj, item, index) => {
  return {
    ...obj,
    [item]: index
  };
}, {});

const sortByVariant = (a: Option, b: Option) => {
  return sortByObject[a.variant as keyof typeof sortByObject] - sortByObject[b.variant as keyof typeof sortByObject];
};

const initialOptions: Option[] = [
  { id: "1", variant: "success", value: "Some success text" },
  { id: "2", variant: "warning", value: "Some warning text" },
  { id: "3", variant: "error", value: "Some error text" }
];

const initialOption: Option = {
  id: initialOptions.at(-1)?.id ?? "1",
  variant: "success",
  value: ""
};

export const CustomInput = (props: NodeProps) => {
  const { id, selected, data } = props;

  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const handleDelete = useDeleteNode();

  const [options, setOptions] = useState((data.options as Option[]) || initialOptions);

  const [newOption, setNewOption] = useState<Option>(initialOption);

  const [isInputOpened, setIsInputOpened] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !isInputOpened &&
      setNewOption((option) => ({
        ...option,
        value: "",
        variant: "success"
      }));
  }, [isInputOpened]);

  useEffect(() => {
    const { nodeInternals } = store.getState();

    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            options
          };
        }

        return node;
      })
    );
  }, [id, options, setNodes, store]);

  const handleShowInput = useCallback(() => {
    setIsInputOpened(true);
    setTimeout(() => {
      ref?.current?.focus();
    });
  }, []);

  const handleSetOptionText = useCallback((e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value;
    setNewOption((option) => ({
      ...option,
      value
    }));
  }, []);

  const handleSetOptionType = useCallback((e: FormEvent<HTMLInputElement>) => {
    const variant = e.currentTarget.value as ExitVariant;

    setNewOption((option) => ({
      ...option,
      variant
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!newOption.value) return;

      setNewOption((option) => ({
        ...option,
        id: `${options.length + 1}`
      }));

      setOptions((opts) => [...opts, newOption]);

      setIsInputOpened(false);
    },
    [newOption, options.length]
  );

  return (
    <StyledCustomInput selected={selected}>
      <NodeContextMenu selected={selected} onDelete={handleDelete} onEdit={handleShowInput} />

      <StyledTitle>
        <Icon path={mdiCommentQuote} size={0.75} />
        <span>Custom Input {id}</span>
      </StyledTitle>

      <StyledSubtitle>Options</StyledSubtitle>

      <StyledOptionsList>
        {options.sort(sortByVariant).map((option, idx) => (
          <li key={idx}>
            {option.value}
            <ExitHandle
              variant={option.variant}
              type="source"
              id={`input_${id}_exit_${option.variant}_${option.id}`}
              position={Position.Right}
            />
          </li>
        ))}
      </StyledOptionsList>

      {isInputOpened && (
        <form onSubmit={handleSubmit}>
          <input value={newOption.value} onInput={handleSetOptionText} onChange={handleSetOptionText} />

          <div>
            {variants.map((v) => {
              return (
                <label key={v}>
                  <input type="radio" value={v} checked={v === newOption.variant} onChange={handleSetOptionType} />
                  {v}
                </label>
              );
            })}
          </div>

          <button type="submit">ok</button>
        </form>
      )}

      <DeafultHandle selected type="target" position={Position.Top} />
    </StyledCustomInput>
  );
};
