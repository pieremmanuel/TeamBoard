import { useState } from 'react';
import { X, Plus } from 'react-feather';
import Utils from '../utils/Utils'; // Make sure this path is correct

const CardAdd = ({ getcard }) => {
  const [card, setCard] = useState('');
  const [show, setShow] = useState(false);

  const saveCard = () => {
    const trimmedCard = card.trim();
    if (!trimmedCard) return;


    const newCard = {
      id: Utils.makeid(5),
      title: trimmedCard,
      assignee: '',
      completed: false,
    };

    getcard(newCard);
    setCard('');
    setShow(false);
  };

  const closeBtn = () => {
    setCard('');
    setShow(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        {show && (
          <div>
            <textarea
              value={card}
              onChange={(e) => setCard(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
              cols="30"
              rows="2"
              placeholder="Enter Card Title..."
            />
            <div className="flex p-1">
              <button
                onClick={saveCard}
                className="p-1 rounded bg-sky-600 text-white mr-2"
              >
                Add Card
              </button>
              <button
                onClick={closeBtn}
                className="p-1 rounded hover:bg-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(true)}
            className="flex p-1 w-full justify-start rounded items-center mt-1 hover:bg-gray-500 h-8"
          >
            <Plus size={16} />
            Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default CardAdd;
