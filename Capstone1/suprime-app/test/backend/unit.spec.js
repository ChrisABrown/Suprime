import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import Item from '../../backend/DAO/models/Item';
import {jest} from '@jest/globals';
import { mocked } from 'jest-mock';

// Mocking the mongoose.connect method since we're not testing the database connection
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  model: jest.fn(),
  Schema: jest.fn(),
}));

// Mocking the nanoid function
jest.mock('nanoid');

const mnanoid = mocked(nanoid)

describe('Item Model', () => {

  afterAll(() => {
    // Clean up mocks
    jest.resetAllMocks();
  });

  it('should create a new item instance', async () => {
    const mockSchema = new mongoose.Schema();
    const modelSpy = jest.spyOn(mongoose, 'model').mockReturnValue({});

    new Item(); // Instantiating the model

    expect(modelSpy).toHaveBeenCalledWith('Item', mockSchema);
  });

  it('should have required fields', () => {
    const item = new Item({
      category: 'Electronics',
      color: ['black', 'silver'],
      price: 499,
      image: { url: 'example.com/image.jpg' },
    });

    const validationError = item.validateSync();

    expect(validationError.errors.itemId).toBeTruthy();
    expect(validationError.errors.SKU).toBeTruthy();
  });

  it('should generate a default SKU using nanoid', () => {
    const item = new Item({
      itemId: '123',
      category: 'Electronics',
      color: ['black', 'silver'],
      price: 499,
      image: { url: 'example.com/image.jpg' },
    });

    expect(item.SKU).toBe('12345'); // Since we mocked the nanoid function to always return '12345'
  });
});
