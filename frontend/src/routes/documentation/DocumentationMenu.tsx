import { NavLink } from 'react-router-dom';

export function DocumentationMenu() {
  return (
    <div className='doc-menu me-auto'>
      <NavLink to='/documentation/about'>
        <div className='mt-0'>
          About
        </div>
      </NavLink>
      <NavLink to='/documentation/params'>
        <div>
          Download Parameters
        </div>
      </NavLink>
      <NavLink to='/documentation/format'>
        <div>
          Download Format
        </div>
      </NavLink>
      <NavLink to='/documentation/api'>
        <div>
          API
        </div>
      </NavLink>
    </div>
  )
}