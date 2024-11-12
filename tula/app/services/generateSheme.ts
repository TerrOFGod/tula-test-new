import { useGenerate } from "../store/use-boardInfo";

export interface ITemplate {
    description: string;
    edgeType: string;
    iterationCounts: number;
    timeStep: number;
    gamesCount: number;
    elements: any;
}
export const generateSheme = (template: ITemplate | null, setDescription: (text: string) => void, onChangeType: (type: string) => void, setGames: (count: number) => void, setIterations: (count: number) => void, setTime: (count: number) => void, generateNode: any, generateEdge:(id: number, source: number, target: number, data: number) => void) => {
    let type: string | null = 'Default';
    if (template) {
        if(template.edgeType === 'default') type = 'Default'
        if(template.edgeType === 'smoothstep') type = 'SmoothStep'
        if(template.edgeType === 'bezier') type = 'Bezier'
        setDescription(template.description)
        onChangeType(type)
        setGames(template.gamesCount)
        setIterations(template.iterationCounts)
        setTime(template.timeStep)
        template.elements.map((el: any) => {
            el.element_type === "node" ? generateNode(el.id, el.struct, el.label) : "close"
        })
        template.elements.map((el: any) => {
            el.element_type === "edge" ? generateEdge(el.id, el.source_id, el.target_id, el.value) : "close"
        })
    }
    return 'no correct data'
}