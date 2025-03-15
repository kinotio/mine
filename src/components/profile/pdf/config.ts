import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 10
  },
  header: {
    marginBottom: 20
  },
  pageHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  headerName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  headerTitle: {
    fontSize: 10,
    color: '#666'
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666'
  },
  contact: {
    fontSize: 10,
    color: '#333'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2
  },
  content: {
    fontSize: 11,
    lineHeight: 1.4
  }
})
