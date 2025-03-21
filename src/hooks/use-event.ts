import { useState, useEffect, useCallback } from 'react'
import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

// Define the event map type with unknown payload types
export interface EventMap {
  'profile:updated': Record<string, unknown>
  'profile:section:create': Record<string, unknown>
}

// Event type helper
type EventType<T extends keyof EventMap> = {
  type: T
  payload: EventMap[T]
}

// Create a union type of all possible events
type AnyEvent = EventType<keyof EventMap>

// Create the RxJS Subject
const eventBus = new Subject<AnyEvent>()

// Type-safe publish function
export const publish = <T extends keyof EventMap>(type: T, payload: EventMap[T]) => {
  eventBus.next({ type, payload })
}

// Hook to subscribe to specific events
export const useEventSubscription = <T extends keyof EventMap>(
  eventType: T,
  callback: (payload: EventMap[T]) => void
) => {
  useEffect(() => {
    const subscription = eventBus
      .pipe(filter((event): event is EventType<T> => event.type === eventType))
      .subscribe((event) => callback(event.payload))

    return () => subscription.unsubscribe()
  }, [eventType, callback])
}

// Hook to subscribe and maintain event history
export const useEvent = <T extends keyof EventMap>(eventType: T) => {
  const [events, setEvents] = useState<EventMap[T][]>([])

  useEffect(() => {
    const subscription = eventBus
      .pipe(filter((event): event is EventType<T> => event.type === eventType))
      .subscribe((event) => {
        setEvents((prevEvents) => [...prevEvents, event.payload])
      })

    return () => subscription.unsubscribe()
  }, [eventType])

  const emit = useCallback(
    (payload: EventMap[T]) => {
      publish(eventType, payload)
    },
    [eventType]
  )

  return { events, emit }
}

// Convenience hook for publishing events
export const useEventEmitter = () => {
  return {
    emit: useCallback(<T extends keyof EventMap>(type: T, payload: EventMap[T]) => {
      publish(type, payload)
    }, [])
  }
}
