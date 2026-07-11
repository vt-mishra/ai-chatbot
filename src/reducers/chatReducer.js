export const initialState = {
  conversations: [],
  currentChatId: null,

  loading: false,
  streaming: false,

  editingMessageId: null,
  editingText: "",
};

export default function chatReducer(state, action) {
  switch (action.type) {
    case "SET_CONVERSATIONS":
      return {
        ...state,
        conversations: action.payload,
      };

    case "ADD_CONVERSATION":
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };

    case "UPDATE_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.map((chat) =>
          chat.id === action.payload.id
            ? {
                ...chat,
                ...action.payload,
              }
            : chat
        ),
      };

    case "DELETE_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.filter(
          (chat) => chat.id !== action.payload
        ),
      };

    case "SELECT_CHAT":
      return {
        ...state,
        currentChatId: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_STREAMING":
      return {
        ...state,
        streaming: action.payload,
      };

    case "START_EDITING":
      return {
        ...state,
        editingMessageId: action.payload.id,
        editingText: action.payload.text,
      };

    case "SET_EDITING_TEXT":
      return {
        ...state,
        editingText: action.payload,
      };

    case "STOP_EDITING":
      return {
        ...state,
        editingMessageId: null,
        editingText: "",
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}