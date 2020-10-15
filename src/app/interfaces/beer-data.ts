import { Beer } from './beer';

export interface BeerData {
    beers: Beer[];
    page: number;
    per_page: number;
    count: number;
    total_count: number;
}
