import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultBox from './ResultBox';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);

    });
    
    it('should show proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'PLN', to: 'USD' },
            { amount: '5', from: 'PLN', to: 'USD' },
            { amount: '345', from: 'PLN', to: 'USD' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('result');
            expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, testObj.from)} = ${formatAmountInCurrency(testObj.amount * 0.2857, testObj.to)}`);
            cleanup()
        }
    });

    it('should show proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100', from: 'USD', to: 'PLN' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '1', from: 'USD', to: 'PLN' },
            { amount: '345', from: 'USD', to: 'PLN' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('result');
            expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, testObj.from)} = ${formatAmountInCurrency(testObj.amount * 3.5, testObj.to)}`);
            cleanup()
        }
    });

    it('should show proper info about conversion when USD -> USD', () => {
        const testCases = [
            { amount: '100', from: 'USD', to: 'USD' },
            { amount: '20', from: 'USD', to: 'USD' },
            { amount: '5', from: 'USD', to: 'USD' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from="USD" to="USD" amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('result');
            expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, testObj.from)} = ${formatAmountInCurrency(testObj.amount, testObj.to)}`);

            cleanup()
        }
    });

    it('should show proper info about conversion when PLN -> PLN', () => {
        const testCases = [
            { amount: '2', from: 'PLN', to: 'PLN' },
            { amount: '345', from: 'PLN', to: 'PLN' },
            { amount: '14', from: 'PLN', to: 'PLN' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from="PLN" to="PLN" amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('result');
            expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, testObj.from)} = ${formatAmountInCurrency(testObj.amount, testObj.to)}`);

            cleanup()
        }
    });

    it('should show proper info when amount is negative', () => {
        const testCases = [
            { amount: '-200', from: 'USD', to: 'PLN' },
            { amount: '-1.24', from: 'USD', to: 'PLN' },
            { amount: '-10', from: 'USD', to: 'PLN' }
        ];

        for (const testObj of testCases) {
            render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
            const output = screen.getByTestId('result');
            expect(output).toHaveTextContent('Wrong value...');

            cleanup()
        }
    });
});

