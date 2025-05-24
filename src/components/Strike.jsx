function Strike( {strikeClass} ) {
    if (!strikeClass) return null;
    return <div className={`strike ${strikeClass}`}></div>
}

export default Strike;