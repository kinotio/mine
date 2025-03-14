import chalk from 'chalk'

type LogLevel = 'info' | 'error' | 'warn' | 'debug' | 'success'

interface LogOptions {
  context?: string
  data?: unknown
  error?: Error
}

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString()
  }

  private formatMessage(level: LogLevel, message: string, options?: LogOptions): string {
    const timestamp = this.getTimestamp()
    const context = options?.context ? `[${options.context}] ` : ''

    let formattedMessage = `${timestamp} ${context}${message}`

    if (options?.data) {
      formattedMessage += '\nData: ' + JSON.stringify(options.data, null, 2)
    }

    if (options?.error?.stack) {
      formattedMessage += '\nStack:\n' + options.error.stack
    }

    return formattedMessage
  }

  private logWithEmoji(emoji: string, color: chalk.ChalkFunction, message: string) {
    console.log(color(`${emoji} ${message}`))
  }

  info(message: string, options?: LogOptions) {
    this.logWithEmoji('ℹ️', chalk.blue, this.formatMessage('info', message, options))
  }

  success(message: string, options?: LogOptions) {
    this.logWithEmoji('✅', chalk.green, this.formatMessage('success', message, options))
  }

  error(message: string, options?: LogOptions) {
    this.logWithEmoji('❌', chalk.red, this.formatMessage('error', message, options))
  }

  warn(message: string, options?: LogOptions) {
    this.logWithEmoji('⚠️', chalk.yellow, this.formatMessage('warn', message, options))
  }

  debug(message: string, options?: LogOptions) {
    if (process.env.NODE_ENV === 'development') {
      this.logWithEmoji('🔍', chalk.magenta, this.formatMessage('debug', message, options))
    }
  }
}

export const log = new Logger()
