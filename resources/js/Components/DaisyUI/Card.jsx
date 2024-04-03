const Card = ({ children }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="p-4">{children}</div>
        </div>
    )
}

export default Card
