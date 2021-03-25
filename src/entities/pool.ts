import { BigintIsh, ChainId, Price, Token, TokenAmount } from '@uniswap/sdk-core'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import { FACTORY_ADDRESS, FeeAmount } from '../constants'
import { computePoolAddress } from '../utils/computePoolAddress'
import { getLiquidityForAmounts } from '../utils/getLiquidityForAmounts'
import { TickList } from './tickList'

export class Pool {
  public readonly token0: Token
  public readonly token1: Token
  public readonly fee: FeeAmount
  public readonly sqrtPriceX96: JSBI
  public readonly liquidity: JSBI
  public readonly ticks: TickList

  public static getAddress(tokenA: Token, tokenB: Token, fee: FeeAmount): string {
    return computePoolAddress({ factoryAddress: FACTORY_ADDRESS, fee, tokenA, tokenB })
  }

  public constructor(
    tokenA: Token,
    tokenB: Token,
    fee: FeeAmount,
    sqrtPriceX96: BigintIsh,
    inRangeLiquidity: BigintIsh,
    initializedTicks: TickList
  ) {
    invariant(Number.isInteger(fee), 'Fees can only be integer (uint24) values.')
    invariant(Boolean(initializedTicks?.head), 'Must have at least one initialized tick.')
    ;[this.token0, this.token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
    this.fee = fee
    this.sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96)
    this.ticks = initializedTicks
    this.liquidity = JSBI.BigInt(inRangeLiquidity)
  }

  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  public involvesToken(token: Token): boolean {
    return token.equals(this.token0) || token.equals(this.token1)
  }

  /**
   * Returns the current mid price of the pool in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  public get token0Price(): Price {
    throw new Error('todo')
  }

  /**
   * Returns the current mid price of the pool in terms of token1, i.e. the ratio of reserve0 to reserve1
   */
  public get token1Price(): Price {
    throw new Error('todo')
  }

  /**
   * Return the price of the given token in terms of the other token in the pool.
   * @param token token to return price of
   */
  public priceOf(token: Token): Price {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.token0Price : this.token1Price
  }

  /**
   * Returns the chain ID of the tokens in the pool.
   */
  public get chainId(): ChainId | number {
    return this.token0.chainId
  }

  public get feeLevel(): FeeAmount {
    return this.fee
  }

  public get inRangeLiquidity(): BigintIsh {
    return this.liquidity.toString()
  }

  public get tickList(): TickList {
    return this.ticks
  }

  public getOutputAmount(inputAmount: TokenAmount): [TokenAmount, Pool] {
    invariant(this.involvesToken(inputAmount.token), 'TOKEN')
    throw new Error('todo')
  }

  public getInputAmount(outputAmount: TokenAmount): [TokenAmount, Pool] {
    invariant(this.involvesToken(outputAmount.token), 'TOKEN')
    throw new Error('todo')
  }

  /**
   * Computes the maximum amount of liquidity received for a given amount of token0, token1,
   * and the prices at the tick boundaries.
   * @param sqrtRatioAX96 price at lower boundary
   * @param sqrtRatioBX96 price at upper boundary
   * @param amount0 token0 amount
   * @param amount1 token1 amount
   */
  public getLiquidityForAmounts(
    sqrtRatioAX96: JSBI,
    sqrtRatioBX96: JSBI,
    amount0: TokenAmount,
    amount1: TokenAmount
  ): JSBI {
    return getLiquidityForAmounts(this.sqrtPriceX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1)
  }

  public getLiquidityValue(
    token: Token,
    totalSupply: TokenAmount,
    liquidity: TokenAmount,
    _: boolean = false,
    __?: BigintIsh
  ): TokenAmount {
    invariant(this.involvesToken(token), 'TOKEN')
    invariant(liquidity.raw <= totalSupply.raw, 'LIQUIDITY')
    throw new Error('todo')
  }
}
