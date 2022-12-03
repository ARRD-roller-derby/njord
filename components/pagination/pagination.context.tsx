import { createContext } from 'react';
import { PaginationResults } from './pagination.type';

export const PaginationContext = createContext<PaginationResults>(null);