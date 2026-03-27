import Typewritter from "typewriter-effect"

export const Head = () => {
    return (
        <div>
            <Typewritter options={{
                strings: ["I'm Rakha Fausta", "Think, Craft, Grow."],
                autoStart: true,
                loop: true,
                delay: 67
            }}/>
        </div>
    )
}
