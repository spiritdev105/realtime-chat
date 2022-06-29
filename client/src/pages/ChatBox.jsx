import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'

export default function ChatBox() {
    return (
        <>
            <ChatHeader />

            <main className="h-full max-h-full hideScrollBar overflow-scroll pb-28 pt-[7.5rem]">
                <ChatMessage />
                <ChatMessage own={true} />
                <ChatMessage own={true} />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage own={true} />
                <ChatMessage own={true} />
                <ChatMessage />
                <ChatMessage />
            </main>

            <ChatInput />
        </>
    )
}
