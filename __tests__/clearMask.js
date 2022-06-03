import {clearMask} from "../src/utils/clearMask";

describe('Limpar Máscara', () => {
    it('remove pontos', () => {
        const result = clearMask('..');
        expect(result).toBe('')
    });
    it('remove hífens', () => {
        const result = clearMask('--');
        expect(result).toBe('')
    });
    it('remove espaços', () => {
        const result = clearMask('  ');
        expect(result).toBe('')
    });
});