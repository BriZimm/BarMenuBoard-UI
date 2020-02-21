export function enumSelector(definition) {
    return Object.keys(definition)
        .filter(f => !isNaN(Number(f)))
        .map(key => ({ value: key, title: definition[key] }));
}