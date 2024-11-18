import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ToggleButton } from "./Buttons";

type CardProps = {
    title: ListItem["title"];
    description?: ListItem["description"];
    isExpanded?: boolean;
    handleExpand?: () => void;
    handleDelete?: () => void;
};

export const Card: FC<CardProps> = ({
    title,
    description,
    isExpanded,
    handleExpand,
    handleDelete,
}) => {
    return (
        <div className="border border-black px-2 py-1.5">
            <div className="flex justify-between mb-0.5">
                <h1 className="font-medium">{title}</h1>
                <div className="flex">
                    {handleExpand && (
                        <ToggleButton
                            isExpanded={!!isExpanded}
                            onClick={handleExpand}
                        />
                    )}
                    {handleDelete && <DeleteButton onClick={handleDelete} />}
                </div>
            </div>
            {description && (
                <p
                    className={`text-sm overflow-hidden transition-all duration-300 ${
                        isExpanded ? "max-h-96" : "max-h-0"
                    }`}
                >
                    {description}
                </p>
            )}
        </div>
    );
};
