

export default function getColor(str: string, saturation = 50, lightness = 50): string {
    let codeCumulate: number = Array.from(str.toLowerCase()).reduce((sum, current): number => {
        let code: number = current.codePointAt(0) as number;

        return sum + code;
    }, 0)

    let hue = ((codeCumulate) % 360 + 360) % 360
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}   