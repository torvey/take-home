import { useCallback, useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { useStore } from "../store";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
    const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
    const [expandedCardsIds, setExpandedCardsIds] = useState<number[]>([]);
    const [showDeleted, setShowDeleted] = useState(false);

    const listQuery = useGetListData();

    const deleteCard = useStore((state) => state.deleteCard);
    const deletedCards = useStore((state) => state.deletedCards);

    const handleDelete = useCallback(
        (item: ListItem) => {
            deleteCard(item);
            setVisibleCards((prev) =>
                prev.filter((card) => card.id !== item.id)
            );
        },
        [deleteCard]
    );

    const toggleExpand = useCallback((id: number) => {
        setExpandedCardsIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            }

            return [...prev, id];
        });
    }, []);

    const handleReveal = useCallback(() => {
        setShowDeleted((prev) => !prev);
    }, []);

    useEffect(() => {
        if (listQuery.isLoading) {
            return;
        }

        setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
    }, [listQuery.data, listQuery.isLoading]);

    if (listQuery.isLoading) {
        return <Spinner />;
    }

    return (
        <div className="flex gap-x-16">
            <div className="w-full max-w-xl">
                <h1 className="mb-1 font-medium text-lg">
                    My Awesome List ({visibleCards.length})
                </h1>
                <div className="flex flex-col gap-y-3">
                    {visibleCards.map((card) => (
                        <Card
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            isExpanded={expandedCardsIds.includes(card.id)}
                            handleExpand={() => toggleExpand(card.id)}
                            handleDelete={() => handleDelete(card)}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full max-w-xl">
                <div className="flex items-center justify-between">
                    <h1 className="mb-1 font-medium text-lg">
                        Deleted Cards ({deletedCards.length})
                    </h1>
                    <button
                        onClick={handleReveal}
                        className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
                    >
                        {showDeleted ? "Hide" : "Reveal"}
                    </button>
                </div>
                <div
                    className={`flex flex-col gap-y-3 ${
                        showDeleted ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {deletedCards.map((card) => (
                        <Card
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            // TODO: add revert functionality in the future
                            // handleDelete={() => handleRevert(card)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
